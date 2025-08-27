import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import Header from "../components/Header";

const AboutUsPage: React.FC<PageProps> = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="hero min-h-[60vh] bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-base-content mb-6">About Us</h1>
              <p className="text-xl text-base-content/70">
                Discover the story behind Exceed Education and our mission to transform learning
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-base-content mb-8">Our Mission</h2>
              <p className="text-lg text-base-content/70 leading-relaxed mb-8">
                At Exceed Education, we believe that every student has the potential to excel. 
                Our mission is to provide personalized, high-quality tutoring that not only 
                improves academic performance but also builds confidence and fosters a love for learning.
              </p>
              <p className="text-lg text-base-content/70 leading-relaxed">
                We work with students of all ages and abilities, creating customized learning 
                plans that address individual needs and learning styles. Our experienced tutors 
                are passionate about education and committed to helping each student reach their full potential.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-base-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-base-content text-center mb-16">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <h3 className="card-title text-xl justify-center">Excellence</h3>
                  <p className="text-base-content/70">
                    We strive for excellence in everything we do, from our teaching methods to our student outcomes.
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                    </svg>
                  </div>
                  <h3 className="card-title text-xl justify-center">Personalization</h3>
                  <p className="text-base-content/70">
                    Every student is unique, and we tailor our approach to meet individual learning needs and goals.
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <h3 className="card-title text-xl justify-center">Passion</h3>
                  <p className="text-base-content/70">
                    Our love for education drives us to inspire and motivate students to achieve their dreams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-base-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-base-content mb-4">Our Team</h2>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                Meet the dedicated professionals who make Exceed Education possible
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body text-center">
                  <div className="avatar placeholder mx-auto mb-4">
                    <div className="bg-neutral text-neutral-content rounded-full w-24 h-24">
                      <span className="text-3xl">S</span>
                    </div>
                  </div>
                  <h3 className="card-title text-xl justify-center">Sarah Johnson</h3>
                  <p className="text-primary font-semibold">Founder & Director</p>
                  <p className="text-base-content/70">
                    With over 15 years of experience in education, Sarah leads our team with passion and expertise.
                  </p>
                </div>
              </div>

              <div className="card bg-base-200 shadow-xl">
                <div className="card-body text-center">
                  <div className="avatar placeholder mx-auto mb-4">
                    <div className="bg-neutral text-neutral-content rounded-full w-24 h-24">
                      <span className="text-3xl">M</span>
                    </div>
                  </div>
                  <h3 className="card-title text-xl justify-center">Michael Chen</h3>
                  <p className="text-primary font-semibold">Head of Mathematics</p>
                  <p className="text-base-content/70">
                    Specializing in advanced mathematics, Michael makes complex concepts accessible to all students.
                  </p>
                </div>
              </div>

              <div className="card bg-base-200 shadow-xl">
                <div className="card-body text-center">
                  <div className="avatar placeholder mx-auto mb-4">
                    <div className="bg-neutral text-neutral-content rounded-full w-24 h-24">
                      <span className="text-3xl">E</span>
                    </div>
                  </div>
                  <h3 className="card-title text-xl justify-center">Emma Rodriguez</h3>
                  <p className="text-primary font-semibold">Head of English</p>
                  <p className="text-base-content/70">
                    Emma's expertise in literature and language arts helps students develop strong communication skills.
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
