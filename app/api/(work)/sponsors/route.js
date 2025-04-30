import connectToDatabase from "@/lib/mongodb";
import Sponsor from "@/models/Sponsor";

// GET all sponsors
export async function GET() {
  await connectToDatabase();
  const sponsors = await Sponsor.find({});
  return new Response(JSON.stringify(sponsors), { status: 200 });
}

// CREATE a new sponsor
export async function POST(req) {
  try {
    const data = await req.json();
    await connectToDatabase();
    await Sponsor.create(data);
    return new Response(
      JSON.stringify({ success: true, message: "Sponsor added successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Sponsor Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to add sponsor" }),
      { status: 500 }
    );
  }
}

// UPDATE a sponsor by email
export async function PUT(req) {
  try {
    const { email, update } = await req.json(); // { email, update: { name, websiteUrl, ... } }
    await connectToDatabase();
    const updatedSponsor = await Sponsor.findOneAndUpdate(
      { email },
      { $set: update },
      { new: true }
    );

    if (!updatedSponsor) {
      return new Response(
        JSON.stringify({ success: false, message: "Sponsor not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Sponsor updated successfully!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Sponsor Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

// DELETE a sponsor by email
export async function DELETE(req) {
  try {
    const { email } = await req.json();
    await connectToDatabase();
    const deletedSponsor = await Sponsor.findOneAndDelete({ email });

    if (!deletedSponsor) {
      return new Response(
        JSON.stringify({ success: false, message: "Sponsor not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Sponsor deleted successfully!",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Sponsor Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
