import React from "react";

function Cutoff({ college }) {
  return (
    <div>
      {/* Cutoff section */}
      {college.cutOff ? (
        <Section id="cutoff" title="Cutoff Details">
          <p className="text-gray-700 text-sm italic">
            * Below are the JOSAA 2024 round 5 closing ranks for male-only
            candidates, specific to the CSE (B.Tech) program.
          </p>
          <p className="text-gray-700 text-sm mb-4 italic">
            * All mentioned ranks are category-wise.
          </p>

          <Table
            head={["Category", "Cut Offs"]}
            rows={[
              [
                <ul key="courses-list">
                  {["General", "OBC-NCL", "Genereal-EWS", "Scheduled Castes", "Scheduled Tribes"].map(
                    (category, index) => (
                      <li key={index} className="border-b mb-1">
                        {category}
                      </li>
                    )
                  )}
                </ul>,
                <ul key="courses-list">
                  {college.cutOff
                    ? college.cutOff
                        .split(",")
                        .filter((sentence) => sentence.trim().length > 0)
                        .map((sentence, index) => (
                          <p
                            key={index}
                            className="text-gray-800 border-b mb-1"
                          >
                            {sentence.trim()}
                          </p>
                        ))
                    : "Cut off information not available."}
                </ul>,
              ],
            ]}
          />
        </Section>
      ) : (
        <Section id="cutoff" title="Cutoff Details">
          <p className="text-gray-500 italic text-sm">
            Cutoff data is currently not available.
          </p>
        </Section>
      )}
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

export default Cutoff;
