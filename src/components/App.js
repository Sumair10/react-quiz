import {useEffect, useReducer} from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from './Timer'

const SECS_PER_QUESTION =30
const initialState = {
    questions: [],
    // loading , error , ready , active , finished
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining:null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'dataRecieved' :
            return {...state, questions: action.payload, status: 'ready'}
        case 'dataFailed':
            return {...state, status: 'error'}
        case 'start' :
            return {...state, status: 'active', secondsRemaining: state.questions.length * SECS_PER_QUESTION}
        case 'newAnswer' :
            const question = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points
            }
        case 'nextQuestion' :
            return {...state, index: state.index + 1, answer: null}
        case 'finished' :
            return {
                ...state,
                status: 'finished',
                highscore: state.points > state.highscore ? state.points : state.highscore
            }
        case 'restart' :
            return {...initialState, questions: state.questions, status: 'ready'}
        case 'tick' :
            return {...state ,secondsRemaining : state.secondsRemaining -1 ,status : state.secondsRemaining === 0 ? "finished" : state.status }
        default:
            throw new Error('Unknown Action')
    }
}

function App() {

    const [{questions, status, index, answer, points, highscore ,secondsRemaining}, dispatch] = useReducer(reducer, initialState)
    const totalQuestions = questions.length
    const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0)
    useEffect(() => {
        fetch('http://localhost:8000/questions')
            .then(res => res.json())
            .then(data => dispatch({type: 'dataRecieved', payload: data}))
            .catch(err => dispatch({type: 'dataFailed'}))
    }, [])
    return (
        <div className="App">
            <Header/>
            <Main>
                {status === 'loading' && <Loader/>}
                {status === 'error' && <Error/>}
                {status === 'ready' && <StartScreen totalQuestions={totalQuestions} dispatch={dispatch}/>}
                {status === 'active' && (
                    <>
                        <Progress index={index} totalQuestions={totalQuestions} points={points} maxPoints={maxPoints}
                                  answer={answer}/>
                        <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
                        <Footer>
                            <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}/>
                            <NextButton dispatch={dispatch} answer={answer} index={index}
                                        totalQuestions={totalQuestions}/>
                        </Footer>

                    </>
                )}
                {status === 'finished' &&
                    <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch}/>}
            </Main>
        </div>
    );
}

export default App;
