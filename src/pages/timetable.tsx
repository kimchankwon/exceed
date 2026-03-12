import * as React from "react";
import { HeadFC, PageProps } from "gatsby";

const TimetablePage: React.FC<PageProps> = () => {
  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="pt-20">
        {/* Hero Section */}
        <section data-header-theme="dark" className="hero bg-base-200 min-h-[60vh]">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-base-content mb-6 text-5xl font-bold">Class Timetable</h1>
              <p className="text-base-content/70 text-xl">
                View our weekly schedule and find the perfect time for your learning journey
              </p>
            </div>
          </div>
        </section>

        {/* Timetable Section */}
        <section data-header-theme="light" className="bg-base-100 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-base-content mb-4 text-3xl font-bold">Weekly Schedule</h2>
              <p className="text-base-content/70 mx-auto max-w-2xl text-lg">
                Our flexible timetable accommodates various schedules and learning preferences
              </p>
            </div>

            {/* Timetable Grid */}
            <div className="overflow-x-auto">
              <table className="table-zebra table w-full">
                <thead>
                  <tr>
                    <th className="bg-primary text-primary-content">Time</th>
                    {days.map((day) => (
                      <th key={day} className="bg-primary text-primary-content text-center">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time}>
                      <td className="bg-base-200 font-semibold">{time}</td>
                      {days.map((day) => (
                        <td key={`${day}-${time}`} className="text-center">
                          {getClassForTimeSlot(day, time)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="mt-8 text-center">
              <h3 className="text-base-content mb-4 text-xl font-semibold">Class Types</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="badge badge-primary badge-lg">Mathematics</div>
                <div className="badge badge-secondary badge-lg">English</div>
                <div className="badge badge-accent badge-lg">Science</div>
                <div className="badge badge-neutral badge-lg">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Information */}
        <section data-header-theme="dark" className="bg-base-200 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-base-content mb-12 text-center text-3xl font-bold">
                Booking Information
              </h2>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-primary text-xl">How to Book</h3>
                    <ul className="text-base-content/70 space-y-2">
                      <li>• Contact us to discuss your learning goals</li>
                      <li>• Choose your preferred time slots</li>
                      <li>• Confirm your schedule with our team</li>
                      <li>• Start your personalized learning journey</li>
                    </ul>
                  </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-primary text-xl">Flexibility</h3>
                    <ul className="text-base-content/70 space-y-2">
                      <li>• One-on-one or small group sessions</li>
                      <li>• Online or in-person options</li>
                      <li>• Customizable session lengths</li>
                      <li>• Rescheduling available with notice</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button className="btn btn-primary btn-lg">Book Your Session</button>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section data-header-theme="light" className="bg-base-100 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-base-content mb-8 text-3xl font-bold">Need a Custom Schedule?</h2>
              <p className="text-base-content/70 mb-8 text-lg leading-relaxed">
                Can&apos;t find a suitable time in our regular schedule? We understand that every
                student has unique needs and constraints. Contact us to discuss custom scheduling
                options that work for you.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="btn btn-outline btn-primary">Contact Us</button>
                <button className="btn btn-primary">Request Custom Time</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Helper function to get class information for time slots
const getClassForTimeSlot = (day: string, time: string): string => {
  // This is placeholder logic - in a real app, this would come from a database
  if (day === "Monday" && time === "9:00 AM") return "Mathematics";
  if (day === "Tuesday" && time === "10:00 AM") return "English";
  if (day === "Wednesday" && time === "2:00 PM") return "Science";
  if (day === "Thursday" && time === "3:00 PM") return "Mathematics";
  if (day === "Friday" && time === "4:00 PM") return "English";
  if (day === "Saturday" && time === "10:00 AM") return "Mathematics";

  // Randomly assign some classes for demonstration
  const classes = ["Mathematics", "English", "Science", "Available"];
  const randomIndex = Math.floor(Math.random() * classes.length);
  return classes[randomIndex];
};

export default TimetablePage;

export const Head: HeadFC = () => <title>Timetable - Exceed Education</title>;
