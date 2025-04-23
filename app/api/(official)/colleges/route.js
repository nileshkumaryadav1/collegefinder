import { connectToDatabase } from "@/lib/mongodb";
import College from "@/models/College";

export async function GET() {
  try {
    await connectToDatabase();
    const colleges = await College.find({});
    return new Response(JSON.stringify(colleges), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching colleges" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      slug,
      location,
      phone,
      email,
      nirfRanking,
      imageUrl,
      logoUrl,
      description,
      courses,
      affiliation,
      type,
      admissionProcess,
      fees,
      hostelFees,
      otherFees,
      feeWaiver,
      cutOff,
      facilities,
      noOfStudents,
      noOfFaculties,
      highestPlacement,
      averagePlacement,
      medianSalary,
      websiteUrl,
      placementRatio,
      pastRecruitor,
      nirfPdf,
    } = body;

    if (
      !name ||
      !slug ||
      !location ||
      !phone ||
      !email ||
      !nirfRanking ||
      !imageUrl ||
      !logoUrl ||
      !description ||
      !courses ||
      !affiliation ||
      !type ||
      !admissionProcess ||
      !fees ||
      !hostelFees ||
      !otherFees ||
      !feeWaiver ||
      !cutOff ||
      !facilities ||
      !noOfStudents ||
      !noOfFaculties ||
      !highestPlacement ||
      !averagePlacement ||
      !medianSalary ||
      !websiteUrl ||
      !placementRatio ||
      !pastRecruitor ||
      !nirfPdf
    ) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    await connectToDatabase();
    const newCollege = new College({
      name,
      slug,
      location,
      phone,
      email,
      nirfRanking,
      imageUrl,
      logoUrl,
      description,
      courses,
      affiliation,
      type,
      admissionProcess,
      fees,
      hostelFees,
      otherFees,
      feeWaiver,
      cutOff,
      facilities,
      noOfStudents,
      noOfFaculties,
      highestPlacement,
      averagePlacement,
      medianSalary,
      websiteUrl,
      placementRatio,
      pastRecruitor,
      nirfPdf,
    });
    await newCollege.save();

    return new Response(
      JSON.stringify({ message: "College added successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error adding college" }), {
      status: 500,
    });
  }
}
