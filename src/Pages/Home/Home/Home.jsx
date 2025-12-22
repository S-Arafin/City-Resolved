import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { FaCheckCircle, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import Banner from "../../../Components/Shared/Banner";
import Feature from "../../../Components/Elements/Feature";
import InternalWorkings from "../../../Components/Elements/InternalWorkings";
import Loader from "../../../Components/Shared/Loader";

const Home = () => {
  const { data: resolvedIssues = [], isLoading } = useQuery({
    queryKey: ["recent-resolved"],
    queryFn: async () => {
      const res = await axios.get(
        "https://city-resolved-backend.vercel.app/issues/resolved/recent"
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div>
      <Banner></Banner>
      <Feature></Feature>
      <InternalWorkings></InternalWorkings>

      <div className="py-20 bg-base-200 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-left">
              <h2 className="text-4xl font-bold mb-2">Recently Resolved</h2>
              <p className="text-gray-500">
                See the impact we are making in your neighborhood.
              </p>
            </div>
            <Link
              to="/all-issues"
              className="btn btn-link no-underline text-lg mt-4 md:mt-0"
            >
              See All <FaArrowRight />
            </Link>
          </div>

          {resolvedIssues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resolvedIssues.map((issue) => (
                <div
                  key={issue._id}
                  className="card bg-base-100 shadow-xl overflow-hidden group"
                >
                  <figure className="h-56 relative overflow-hidden">
                    <img
                      src={issue.photo}
                      alt={issue.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 badge badge-success gap-1 font-bold shadow-md">
                      <FaCheckCircle /> Resolved
                    </div>
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">{issue.title}</h3>
                    <p className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <FaMapMarkerAlt className="text-primary" />{" "}
                      {issue.location}
                    </p>
                    <p className="text-sm line-clamp-2">{issue.description}</p>

                    <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200">
                      <Link
                        to={`/issues/${issue._id}`}
                        className="btn btn-sm btn-outline btn-primary w-full"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500">
                No resolved issues to show yet. Be the first to report one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
