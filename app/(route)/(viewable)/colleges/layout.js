// app/(route)/(viewable)/colleges/layout.js

export const metadata = {
  title: "Colleges",
  description:
    "Explore top colleges, universities, courses, fees, placements, and more with College Finder. Find the perfect academic match for your future.",
};

export default function CollegesLayout({ children }) {
  return <section>{children}</section>;
}
