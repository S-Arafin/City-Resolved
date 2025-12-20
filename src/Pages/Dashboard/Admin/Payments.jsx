import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../Components/Shared/Loader";
import { FaFileInvoice, FaMoneyBillWave } from "react-icons/fa";
import jsPDF from "jspdf";

const Payments = () => {
  const [filterType, setFilterType] = useState("all");

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/payments");
      return res.data;
    },
  });

  const filteredPayments =
    filterType === "all"
      ? payments
      : payments.filter((pay) => pay.type === filterType);

  const handleDownloadInvoice = (payment) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text("City Resolved - Invoice", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice ID: ${payment.transactionId}`, 20, 40);
    doc.text(`Date: ${new Date(payment.date).toLocaleDateString()}`, 20, 50);
    doc.text(`Customer Name: ${payment.name}`, 20, 60);
    doc.text(`Customer Email: ${payment.email}`, 20, 70);

    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);

    doc.setFontSize(14);
    doc.text("Description", 20, 90);
    doc.text("Amount", 160, 90);

    doc.setFontSize(12);
    const description =
      payment.type === "subscription"
        ? "Premium Member Subscription (Lifetime)"
        : "Issue Priority Boost Service";

    doc.text(description, 20, 100);
    doc.text(`${payment.price} Tk`, 160, 100);

    doc.line(20, 110, 190, 110);
    doc.setFontSize(14);
    doc.font = "bold";
    doc.text(`Total Paid: ${payment.price} Tk`, 140, 125);

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      "Thank you for helping us build a better city!",
      105,
      280,
      null,
      null,
      "center"
    );

    doc.save(`invoice_${payment.transactionId}.pdf`);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaMoneyBillWave className="text-success" /> Payment History
      </h2>

      <div className="flex justify-end mb-4">
        <div className="join">
          <button
            className={`btn join-item ${
              filterType === "all" ? "btn-active btn-primary" : ""
            }`}
            onClick={() => setFilterType("all")}
          >
            All
          </button>
          <button
            className={`btn join-item ${
              filterType === "subscription" ? "btn-active btn-primary" : ""
            }`}
            onClick={() => setFilterType("subscription")}
          >
            Subscriptions
          </button>
          <button
            className={`btn join-item ${
              filterType === "boost" ? "btn-active btn-primary" : ""
            }`}
            onClick={() => setFilterType("boost")}
          >
            Boosts
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg border border-base-200">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((pay, index) => (
              <tr key={pay._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="font-bold">{pay.name}</div>
                  <div className="text-xs opacity-50">{pay.email}</div>
                </td>
                <td className="font-mono text-xs">{pay.transactionId}</td>
                <td>{new Date(pay.date).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      pay.type === "subscription"
                        ? "badge-warning"
                        : "badge-info"
                    } uppercase text-xs font-bold`}
                  >
                    {pay.type}
                  </span>
                </td>
                <td className="font-bold text-success">{pay.price} Tk</td>
                <td>
                  <button
                    onClick={() => handleDownloadInvoice(pay)}
                    className="btn btn-sm btn-ghost gap-2 text-gray-600 hover:text-primary"
                  >
                    <FaFileInvoice />{" "}
                    <span className="hidden md:inline">PDF</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPayments.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No payments found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
