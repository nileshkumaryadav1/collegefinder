import { Building, FileText, Users } from "lucide-react";
import React from "react";

function Placement({ college }) {
  return (
    <div>
      {/* placement stats */}
      <Section id="placement" title="Placement Stats">
        <Table
          head={[
            "Course",
            "Highest Package",
            "Average Package",
            "Median Package",
          ]}
          rows={[
            [
              college.courses,
              college.highestPlacement,
              college.averagePlacement,
              college.medianSalary,
            ],
          ]}
        />

        {/* placement ratio */}
        <p className="text-gray-700 md:text-lg flex items-left justify-center gap-2 max-w-4xl mx-auto mt-5">
          <div className="flex items-center">
            <Users size={24} />
            <span className="font-semibold">Placement Ratio:</span>
          </div>
        </p>

        {/* nirf */}
        <a
          href={college.nirfPdf}
          rel="noopener noreferrer"
          className="text-gray-700 md:text-md flex items-center justify-center gap-2 md:w-1/7 w-1/2 mx-auto mb-6 mt-2 btn"
        >
          <div className="flex items-center">
            <FileText size={24} />
            <span className="font-semibold">NIRF Report</span>
          </div>
        </a>
        <img
          src={college.placementRatio}
          alt="Placement Ratio Image"
          className="rounded-md shadow max-w-4/5 mx-auto mb-8"
        />

        <p className="text-gray-700 md:text-lg flex items-left justify-center gap-2 max-w-4xl mx-auto mb-2">
          <div className="flex items-center">
            <Building size={24} />
            <span className="font-semibold">Past Recruiters:</span>
          </div>
        </p>
        <img
          src={college.pastRecruitor}
          alt="Past Recruiters Image"
          className="rounded-md shadow max-w-4/5 mx-auto"
        />
      </Section>
    </div>
  );
}

// Reusable components
const Section = ({ id, title, children }) => (
  <section
    id={id}
    className="w-full py-14 px-4 md:px-8 bg-white border-t border-gray-200"
  >
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 md:mb-8 mb-5 hover:underline decoration-sky-500/30 hover:decoration-sky-500 text-gray-800 dark:text-white">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

const Detail = ({ icon: Icon, label, value }) => (
  <p className="flex items-center gap-3">
    <Icon size={22} className="text-blue-600" />
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

const Table = ({ head = [], rows }) => (
  <div className="overflow-x-auto max-w-4xl mx-auto">
    <table className="w-full border-collapse border text-left mt-4 text-sm md:text-base">
      {head.length > 0 && (
        <thead className="bg-gray-100 border-b">
          <tr>
            {head.map((item, idx) => (
              <th key={idx} className="p-3 font-medium border">
                {item}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="even:bg-gray-50">
            {row.map((cell, j) => (
              <td key={j} className="p-3 border">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Placement;
