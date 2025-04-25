// app/(route)/(viewable)/colleges/layout.js

import React from "react";

export const metadata = {
  title: "Colleges | College Finder",
  description:
    "Explore top colleges, universities, courses, fees, placements, and more with College Finder. Find the perfect academic match for your future.",
};

export default function CollegesLayout({ children }) {
  return <section>{children}</section>;
}
