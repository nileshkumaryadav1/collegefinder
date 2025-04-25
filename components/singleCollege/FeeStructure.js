import React from "react";

function FeeStructure({ college }) {
  return (
    <div>
      <Section id="fees" title="Fees Structure">
        <p className="text-gray-700 text-sm mb-4 italic">
          * Fees are indicative and may vary. Annual academic and hostel charges
          for all categories are listed below.
        </p>

        <div className="overflow-x-auto">
          <table className="w-6/8 mx-auto text-sm md:text-base text-left border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border-b border-gray-200">Particulars</th>
                <th className="p-3 border-b border-gray-200">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">Academic Fee</td>
                <td className="p-3 font-medium text-gray-800">
                  ₹
                  {college.fees
                    ? college.fees?.toLocaleString()
                    : "Fee information not available."}
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3">Hostel + Mess Fee</td>
                <td className="p-3 font-medium text-gray-800">
                  ₹
                  {college.hostelFees
                    ? college.hostelFees?.toLocaleString()
                    : "Hostel fee information not available."}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Total Estimated Fee</td>
                <td className="p-3 font-semibold text-blue-700">
                  ₹
                  {college.otherFees
                    ? college.otherFees?.toLocaleString()
                    : "Other fee information not available."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

export default FeeStructure;
