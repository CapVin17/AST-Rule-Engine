import React, { useState } from "react";
import Header from "./components/Header";
import SingleRuleInput from "./components/SingleRuleInput";
import MultipleRulesInput from "./components/MultipleRulesInput";
import EvaluateInput from "./components/EvaluateInput";
import ResponseDisplay from "./components/ResponseDisplay";
import axios from "axios";

function App() {
  const [response,setResponse] = useState(null);

  const handleSingleRuleSubmit = async (rule) => {
    const res = await axios.post("https://ast-rule-engine.onrender.com/api/rule", { rule });
    setResponse(res.data);
  };

  const handleMultipleRulesSubmit = async (rules) => {
    try {
      console.log("Rules sent to backend: ", rules);
      const res = await axios.post("https://ast-rule-engine.onrender.com/api/rules", { rules });
      console.log("Response from backend : ", res.data);
      setResponse(res.data);
    } catch (error) {
      setResponse("Error:" + error.res?.data?.message || "Failed to store rules");
      console.log("Error you are encountering is: ", error);
    }
  };

  const handleEvaluateSubmit = async (data) => {
    const res = await axios.post('https://ast-rule-engine.onrender.com/api/evaluate', data);
    setResponse(res.data);
  };

  return <div className="min-h-screen bg-gray-100 p-6">
    <Header />
    <div className="max-w-2xl mx-auto mt-6">
      <SingleRuleInput onSubmit={handleSingleRuleSubmit} />
      <MultipleRulesInput onSubmit={handleMultipleRulesSubmit} />
      <EvaluateInput onSubmit={handleEvaluateSubmit} />
      {response && <ResponseDisplay response= {response} />}
    </div>
  </div>
}

export default App
