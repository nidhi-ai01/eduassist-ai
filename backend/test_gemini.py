from agent.gemini_agent import ask_gemini

question = "Tell me about IIT Hyderabad in 5 lines."

answer = ask_gemini(question)

print("\nGemini Response:\n")
print(answer)