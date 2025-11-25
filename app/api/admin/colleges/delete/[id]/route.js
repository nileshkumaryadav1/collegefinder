// app/api/colleges/delete/[id]/route.js

import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import College from "@/models/College";

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    // Simple check
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID missing" },
        { status: 400 }
      );
    }

    // Find and delete
    const deleted = await College.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "No college found with this ID" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "College deleted" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
