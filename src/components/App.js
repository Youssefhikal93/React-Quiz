import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import NextButton from "./NextButton";
import Footer from "./Footer";
import Timer from "./Timer";

const storedScore = JSON.parse(localStorage.getItem("score")) || 0;

const intialState = {
  questions: [],
  status: "loading",
  errorMsg: "Error occured💥",
  index: 0,
  answer: null,
  points: 0,
  highestScore: storedScore,
  // highestScore: 0,
  secondsRemaining: null,
};

const secPerQuestions = 10;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error", errorMsg: action.payload };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * secPerQuestions,
      };

    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          currentQuestion.correctOption === action.payload
            ? state.points + currentQuestion.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: (state.answer = null),
      };

    case "finish":
      console.log(
        "Points:",
        state.points,
        "Previous High:",
        state.highestScore
      );

      return {
        ...state,
        status: "finished",
        // highestScore:
        // state.points > state.highestScore && storedScore
        //   ? state.points
        //   : state.highestScore,
        highestScore: Math.max(state.points, state.highestScore),
      };

    case "restart":
      // return { ...state, status: "ready", index: 0, answer: null, points: 0 };
      return {
        ...intialState,
        questions: state.questions,
        status: "ready",
        highestScore: state.highestScore,
      };
    case "tick":
      const newSeconds = state.secondsRemaining - 1;
      const isTimeUp = newSeconds <= 0;
      return {
        ...state,
        // secondsRemaining: state.secondsRemaining - 1,
        // status: state.secondsRemaining <= 0 ? "finished" : state.status,
        secondsRemaining: newSeconds,
        status: isTimeUp ? "finished" : state.status,
        highestScore: isTimeUp
          ? Math.max(state.points, state.highestScore)
          : state.highestScore,
      };

    default:
      throw new Error("Action unknown!");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, intialState);
  // localStorage.removeItem("score");
  useEffect(
    function () {
      localStorage.setItem("score", state.highestScore);
    },
    [state.highestScore]
  );

  useEffect(function () {
    async function getQuestions() {
      try {
        // const res = await fetch("http://localhost:8080/questions");
        const res = await fetch("https://json-api-49go.onrender.com/questions");
        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: "dataFailed", payload: error.message });
      }
    }
    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error errorMsg={state.errorMsg} />}
        {state.status === "ready" && (
          <>
            <StartScreen
              questionsCount={state.questions.length}
              dispatch={dispatch}
            />
          </>
        )}

        {state.status === "active" && (
          <>
            <Progress
              questions={state.questions}
              index={state.index}
              points={state.points}
              answer={state.answer}
            />
            <Question
              question={state.questions[state.index]}
              answer={state.answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer
                secondsRemaining={state.secondsRemaining}
                dispatch={dispatch}
              />
              <NextButton
                answer={state.answer}
                dispatch={dispatch}
                questionsNum={state.questions.length}
                index={state.index}
              />
            </Footer>
          </>
        )}

        {state.status === "finished" && (
          <FinishedScreen
            points={state.points}
            questions={state.questions}
            highestScore={state.highestScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
// import { useEffect, useReducer } from "react";
// import Header from "./Header";
// import Main from "./Main";
// import Loader from "./Loader";
// import Error from "./Error";
// import StartScreen from "./StartScreen";
// import Question from "./Question";
// import Progress from "./Progress";
// import FinishedScreen from "./FinishedScreen";
// import NextButton from "./NextButton";
// import Footer from "./Footer";
// import Timer from "./Timer";

// const storedScore = JSON.parse(localStorage.getItem("score")) || 0;

// const intialState = {
//   questions: [],
//   status: "loading",
//   errorMsg: "Error occured💥",
//   index: 0,
//   answer: null,
//   points: 0,
//   highestScore: storedScore,
//   secondsRemaining: null,
// };

// const secPerQuestions = 0.1;

// function reducer(state, action) {
//   switch (action.type) {
//     case "dataReceived":
//       return { ...state, questions: action.payload, status: "ready" };

//     case "dataFailed":
//       return { ...state, status: "error", errorMsg: action.payload };

//     case "start":
//       return {
//         ...state,
//         status: "active",
//         secondsRemaining: state.questions.length * secPerQuestions,
//       };

//     case "newAnswer":
//       const currentQuestion = state.questions.at(state.index);
//       return {
//         ...state,
//         answer: action.payload,
//         points:
//           currentQuestion.correctOption === action.payload
//             ? state.points + currentQuestion.points
//             : state.points,
//       };

//     case "nextQuestion":
//       return {
//         ...state,
//         index: state.index + 1,
//         answer: null,
//       };

//     case "finish":
//       const newHighScore = Math.max(state.points, state.highestScore);
//       console.log(
//         "Points:",
//         state.points,
//         "Previous High:",
//         state.highestScore,
//         "New High:",
//         newHighScore
//       );

//       return {
//         ...state,
//         status: "finished",
//         highestScore: newHighScore,
//       };

//     case "restart":
//       return {
//         ...intialState,
//         questions: state.questions,
//         status: "ready",
//         highestScore: state.highestScore,
//       };
//     case "tick":
//       return {
//         ...state,
//         secondsRemaining: state.secondsRemaining - 1,
//         status: state.secondsRemaining <= 0 ? "finished" : state.status,
//       };

//     default:
//       throw new Error("Action unknown!");
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer, intialState);

//   useEffect(
//     function () {
//       if (state.status === "finished") {
//         localStorage.setItem("score", JSON.stringify(state.highestScore));
//       }
//     },
//     [state.status, state.highestScore]
//   );

//   useEffect(function () {
//     async function getQuestions() {
//       try {
//         const res = await fetch("http://localhost:8080/questions");
//         const data = await res.json();
//         dispatch({ type: "dataReceived", payload: data });
//       } catch (error) {
//         console.error(error);
//         dispatch({ type: "dataFailed", payload: error.message });
//       }
//     }
//     getQuestions();
//   }, []);

//   return (
//     <div className="app">
//       <Header />
//       <Main>
//         {state.status === "loading" && <Loader />}
//         {state.status === "error" && <Error errorMsg={state.errorMsg} />}
//         {state.status === "ready" && (
//           <>
//             <StartScreen
//               questionsCount={state.questions.length}
//               dispatch={dispatch}
//             />
//           </>
//         )}

//         {state.status === "active" && (
//           <>
//             <Progress
//               questions={state.questions}
//               index={state.index}
//               points={state.points}
//               answer={state.answer}
//             />
//             <Question
//               question={state.questions[state.index]}
//               answer={state.answer}
//               dispatch={dispatch}
//             />
//             <Footer>
//               <Timer
//                 secondsRemaining={state.secondsRemaining}
//                 dispatch={dispatch}
//               />
//               <NextButton
//                 answer={state.answer}
//                 dispatch={dispatch}
//                 questionsNum={state.questions.length}
//                 index={state.index}
//               />
//             </Footer>
//           </>
//         )}

//         {state.status === "finished" && (
//           <FinishedScreen
//             points={state.points}
//             questions={state.questions}
//             highestScore={state.highestScore}
//             dispatch={dispatch}
//           />
//         )}
//       </Main>
//     </div>
//   );
// }

// export default App;
