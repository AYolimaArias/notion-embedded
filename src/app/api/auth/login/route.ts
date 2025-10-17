import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validar entrada
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Verificar credenciales
    const result = verifyCredentials(username, password);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    // Generar token
    const token = generateToken(result.user);

    // Devolver respuesta
    return NextResponse.json({
      success: true,
      token,
      user: result.user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
