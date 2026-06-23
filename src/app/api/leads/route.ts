import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Lead {
  id: string;
  nombre: string;
  email: string;
  empresa: string;
  telefono: string;
  mensaje: string;
  fecha: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

async function ensureDataFile() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2));
  }
}

async function getLeads(): Promise<Lead[]> {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

async function saveLeads(leads: Lead[]): Promise<void> {
  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, empresa, telefono, mensaje } = body;

    // Validación de campos requeridos
    if (!nombre || !email || !empresa || !telefono || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Crear nuevo lead
    const newLead: Lead = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      nombre,
      email,
      empresa,
      telefono,
      mensaje,
      fecha: new Date().toISOString(),
    };

    // Obtener leads existentes y agregar el nuevo
    const leads = await getLeads();
    leads.push(newLead);
    await saveLeads(leads);

    console.log("✅ Lead guardado exitosamente:", newLead.email);

    return NextResponse.json(
      { message: "Lead creado exitosamente", lead: newLead },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al guardar lead:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json(leads);
  } catch (error) {
    console.error("Error al obtener leads:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
