import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import Header from "../components/Header";

const AboutUsPage: React.FC<PageProps> = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="hero bg-base-200 min-h-[60vh]">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-base-content mb-6 text-5xl font-bold">About Us</h1>
              <p className="text-base-content/70 text-xl">
                Discover the story behind Exceed Education and our mission to transform learning
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-base-100 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-base-content mb-8 text-3xl font-bold">Our Mission</h2>
              <p className="text-base-content/70 mb-8 text-lg leading-relaxed">
                At Exceed Education, we believe that every student has the potential to excel. Our
                mission is to provide personalized, high-quality tutoring that not only improves
                academic performance but also builds confidence and fosters a love for learning.
              </p>
              <p className="text-base-content/70 text-lg leading-relaxed">
                We work with students of all ages and abilities, creating customized learning plans
                that address individual needs and learning styles. Our experienced tutors are
                passionate about education and committed to helping each student reach their full
                potential.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-base-200 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-base-content mb-16 text-center text-3xl font-bold">Our Values</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <svg
                      className="text-primary h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="card-title justify-center text-xl">Excellence</h3>
                  <p className="text-base-content/70">
                    We strive for excellence in everything we do, from our teaching methods to our
                    student outcomes.
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <svg
                      className="text-primary h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="card-title justify-center text-xl">Personalization</h3>
                  <p className="text-base-content/70">
                    Every student is unique, and we tailor our approach to meet individual learning
                    needs and goals.
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <svg
                      className="text-primary h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="card-title justify-center text-xl">Passion</h3>
                  <p className="text-base-content/70">
                    Our love for education drives us to inspire and motivate students to achieve
                    their dreams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-base-100 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="text-base-content mb-4 text-3xl font-bold">Our Team</h2>
              <p className="text-base-content/70 mx-auto max-w-2xl text-lg">
                Meet the dedicated professionals who make Exceed Education possible
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body text-center">
                  <div className="avatar placeholder mx-auto mb-4">
                    <div className="bg-neutral text-neutral-content h-24 w-24 rounded-full">
                      <span className="text-3xl">S</span>
                    </div>
                  </div>
                  <h3 className="card-title justify-center text-xl">Sarah Johnson</h3>
                  <p className="text-primary font-semibold">Founder & Director</p>
                  <p className="text-base-content/70">
                    With over 15 years of experience in education, Sarah leads our team with passion
                    and expertise.
                  </p>
                </div>
              </div>

              <div className="card bg-base-200 shadow-xl">
                <div className="card-body text-center">
                  <div className="avatar placeholder mx-auto mb-4">
                    <div className="bg-neutral text-neutral-content h-24 w-24 rounded-full">
                      <span className="text-3xl">M</span>
                    </div>
                  </div>
                  <h3 className="card-title justify-center text-xl">Michael Chen</h3>
                  <p className="text-primary font-semibold">Head of Mathematics</p>
                  <p className="text-base-content/70">
                    Specializing in advanced mathematics, Michael makes complex concepts accessible
                    to all students.
                  </p>
                </div>
              </div>

              <div className="card bg-base-200 shadow-xl">
                <div className="card-body text-center">
                  <div className="avatar placeholder mx-auto mb-4">
                    <div className="bg-neutral text-neutral-content h-24 w-24 rounded-full">
                      <span className="text-3xl">E</span>
                    </div>
                  </div>
                  <h3 className="card-title justify-center text-xl">Emma Rodriguez</h3>
                  <p className="text-primary font-semibold">Head of English</p>
                  <p className="text-base-content/70">
                    Emma&apos;s expertise in literature and language arts helps students develop
                    strong communication skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;

export const Head: HeadFC = () => <title>About Us - Exceed Education</title>;
