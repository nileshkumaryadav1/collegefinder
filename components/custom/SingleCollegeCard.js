"use client";

import { useState } from "react";
import {
  Heart,
  MapPin,
  Star,
  BookOpen,
  Users,
  Globe,
  User,
} from "lucide-react";
import Link from "next/link";

const SingleCollegeCard = ({ college }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* College Header Section */}
      <div
        className="w-full min-h-screen bg-white flex flex-col items-center justify-center text-center p-12 card bg-base-100 image-full hero min-h-screen border border-gray-300 rounded-md"
        style={{
          backgroundImage: "url(" + college.imageUrl + ")",
        }}
      >
        <div className="card-body">
          <div className="flex items-center justify-center">
            <img
              src={college.logoUrl}
              alt={college.name}
              className="w-40 h-40 rounded-full mb-6"
            />
          </div>
          <div className="bg-gray-800 p-5 border border-gray-900 rounded-lg">
            <h1 className="text-5xl font-bold mb-4 text-gray-200">
              {college.name}
            </h1>
            <p className="text-2xl text-gray-400 flex items-center gap-2">
              <MapPin size={24} /> {college.location}
            </p>
            <p className="text-2xl text-gray-300 py-4">
              {college.description}
            </p>
          </div>
          <div className="card-actions justify-between py-5">
            <button
              onClick={() => setLiked(!liked)}
              className="text-gray-100 hover:text-red-500"
            >
              <Heart size={48} fill={liked ? "red" : "none"} />
            </button>

            <button className="btn btn-primary">
              <a href={college.websiteUrl} target="_blank">
                Visit College Site
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* College Details Section */}
      <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-12">
        <h2 className="text-4xl font-semibold mb-8">College Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-2xl text-gray-700">
          <p className="flex items-center gap-3">
            <BookOpen size={24} /> <span className="font-semibold">Type:</span>{" "}
            {college.type}
          </p>
          <p className="flex items-center gap-3">
            <Users size={24} /> <span className="font-semibold">Students:</span>{" "}
            {college.noOfStudents}
          </p>
          <p className="flex items-center gap-3">
            <User size={24} />{" "}
            <span className="font-semibold">Facilities:</span>{" "}
            {college.noOfFaculties}
          </p>
          <p className="flex items-center gap-3">
            <Globe size={24} />{" "}
            <span className="font-semibold">Affiliation:</span>{" "}
            {college.affiliation}
          </p>
          <p className="flex items-center gap-3">
            <Star size={24} />{" "}
            <span className="font-semibold">Nirf Ranking:</span>
            {college.nirfRanking}
          </p>
        </div>
      </div>

      {/* College Description Section */}
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center text-center p-12">
        <img src={college.imageUrl} alt={college.name} className="mb-8 h-50 border border-gray-300 rounded-md" />
        <h2 className="text-4xl font-semibold mb-8">About {college.name}</h2>
        <p className="text-2xl text-gray-700 max-w-4xl">
          {college.description}
        </p>
      </div>

      {/* Facilities Section */}
      <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-12">
        <h2 className="text-4xl font-semibold mb-8">Facilities</h2>
        <ul className="list-disc text-2xl text-gray-700 max-w-4xl text-left">
          {college.facilities}
        </ul>
      </div>

      {/* Popular Courses Section */}
      <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center text-center p-12">
        <h2 className="text-4xl font-semibold mb-8">Popular Courses</h2>
        <ul className="list-disc text-2xl text-gray-700 max-w-4xl text-left">
          <p className="flex items-center gap-3">
            <BookOpen size={24} />{" "}
            <span className="font-semibold">Technical:</span> {college.courses}
          </p>
        </ul>
      </div>

      {/* Admission section */}
      <div className="min-h-screen flex flex-col bg-gray-50 justify-center items-center space-x-4 p-4">
        <div>
          <h2 className="text-4xl font-bold mt-4">Admission Process</h2>
          <p>{college.admissionProcess}</p>
          <h2 className="text-4xl font-bold mt-4">Fees</h2>
          <p>Annual Tutuion fees: {college.fees}</p>
          <p>Hostel Fees: {college.hostelFees}</p>
          <p>Other Fees: {college.otherFees}</p>
        </div>
      </div>

      {/* table section */}
      <div className="bg-white min-h-screen flex flex-col justify-center items-center">
        <div className="p-5">
          <h2 className="text-4xl text-center mt-2">Courses Offered & Admission</h2>
          <table className="table-auto w-full mt-1">
            <thead>
              <tr>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Admission</th>
                <th className="px-4 py-2">Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{college.courses}</td>
                <td className="border px-4 py-2">{college.admissionProcess}</td>
                <td className="border px-4 py-2">{college.fees}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-5 mt-10">
          <h2 className="text-center text-4xl">Placement</h2>
          <table className="table-auto w-full mt-1">
            <thead>
              <tr>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Average Package</th>
                <th className="px-4 py-2">Median Package</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">{college.courses}</td>
                <td className="border px-4 py-2">{college.averagePlacement}</td>
                <td className="border px-4 py-2">{college.medianSalary}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/*  Past Recruitor */}
      <div className="bg-gray-50 p-4 min-h-screen flex flex-col justify-center align-items-center">
        <h2 className="text-center text-4xl text-gray-600 font-bold">
          Past Recruitor
        </h2>
        <img
          src={college.pastRecruitor}
          alt="Past Recruitor"
          className="p-5 m-5"
        />
      </div>

      {/* View More Section */}
      <div className="w-full bg-white flex flex-col items-center justify-center text-center p-12">
        <Link
          href={"/colleges"}
          className="bg-blue-600 text-white text-2xl px-12 py-4 rounded-lg hover:bg-blue-700"
        >
          View More Colleges
        </Link>
      </div>
    </div>
  );
};

export default SingleCollegeCard;
