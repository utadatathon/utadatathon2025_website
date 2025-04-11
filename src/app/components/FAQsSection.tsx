"use client";
import React, { useState } from "react";

export default function FAQsSection() {
  const faqs = [
    {
      id:1,
      question: "What is the UTA Datathon?",
      answer:
        "The UTA Datathon is an annual event where participants create innovative solutions to real-world problems using data science and AI.",
    },
    {
      id:2,
      question: "Who can participate?",
      answer:
        "Active students 18 and above can participate in the datathon. Anyone interested in data science and AI can participate, regardless of their background or experience.",
    },
    {
      id:3,
      question: "What is the theme for this year?",
      answer:
        "This year's theme is focused on leveraging data science and AI to drive positive change in our communities.",
    },
    {
      id:4,
      question: "How long does the event last?",
      answer: "It is a 24hr event and will be held on April 12-13.",
    },
    {
      id:5,
      question: "Do I need to have a team?",
      answer:
        "Yes, you need to have a team of 2-4 members.",
    },
    {
      id:6,
      question: "What kind of support will I receive?",
      answer:
        "Mentors and industry experts will be available to guide you throughout the event.",
    },
    {
      id:7,
      question: "How do I register?",
      answer: "Registration details are available on our website.",
    },
    {
      id:8,
      question: "What are the prizes?",
      answer:
        "We have upto $2000 in Prizes and will be revealed on the day of datathon.",
    },
    {
      id:9,
      question: "Can I attend virtually?",
      answer: "No, you can only attend in person.",
    },
    {
      id:10,
      question: "How can I sponsor the event?",
      answer: "Contact us through our website for sponsorship opportunities.",
    },
  ];

  const [activeFAQs, setActiveFAQs] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    if (activeFAQs.includes(index)) {
      setActiveFAQs(activeFAQs.filter((id) => id !== index));
    } else {
      setActiveFAQs([...activeFAQs, index]);
    }
  };

  return (
    <div className="faqs-section">
      <div className="faqs-grid">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-card">
            <div className="faq-header" onClick={() => toggleFAQ(index)}>
              <h3>{faq.question}</h3>
              <span
                className={`arrow ${
                  activeFAQs.includes(index) ? "active" : ""
                }`}
              >
                <span className="down-arrow">{">"}</span>
              </span>
            </div>
            <div
              className={`faq-answer ${
                activeFAQs.includes(index) ? "active" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
