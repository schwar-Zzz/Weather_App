
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

interface FeedbackProps {
    showForm: boolean;
    setShowForm: (value: boolean) => void;
}

const Feedback = ({showForm,setShowForm} : FeedbackProps ) => {
    const [feedback, setFeedback] = React.useState("");

    const handleSubmit = (e :React.FormEvent ) => {
        e.preventDefault();
        if (!feedback.trim()) {
            alert("❌ Feedback cannot be empty.");
            return;
        }
        console.log("Feedback submitted:", feedback);
        const storedFeedback = localStorage.getItem("feedbacks");
        const feedbacks = storedFeedback ? JSON.parse(storedFeedback) : [];
        feedbacks.push(feedback);
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));


        setFeedback("");
        setShowForm(false);
        alert("✔️ Thank you for your feedback!" );
    }
return (
    <Popup open={showForm} onClose={() => setShowForm(false)}  >
      <div >
        <h2 className="text-xl font-bold mb-2">Feedback</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 mb-2 text-black"
          />
          <button
            type="submit"
            className="bg-indigo-500 px-4 py-2 rounded text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default React.memo(Feedback); 