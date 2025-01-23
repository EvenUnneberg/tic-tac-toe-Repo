import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);
    let lineRef = useRef(null); // Added ref for the winning line
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null);

    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    const toggle = (e, num) => {
        if (lock) {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}'>`;
            data[num] = "x";
            setCount(++count);
        } else {
            e.target.innerHTML = `<img src='${circle_icon}'>`;
            data[num] = "o";
            setCount(++count);
        }
        checkWin();
    };

    const checkWin = () => {
        if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
            won(data[2], [0, 1, 2]);
        } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
            won(data[5], [3, 4, 5]);
        } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
            won(data[8], [6, 7, 8]);
        } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
            won(data[6], [0, 3, 6]);
        } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
            won(data[7], [1, 4, 7]);
        } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
            won(data[8], [2, 5, 8]);
        } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
            won(data[8], [0, 4, 8]);
        } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
            won(data[6], [2, 4, 6]);
        }
    };

    const won = (winner, winIndices) => {
        setLock(true);
    
        // Draw the winning line
        const [start, , end] = winIndices;
        const startBox = box_array[start].current.getBoundingClientRect();
        const endBox = box_array[end].current.getBoundingClientRect();
        const board = document.querySelector(".board").getBoundingClientRect();
    
        const line = lineRef.current;
    
        // Calculate the center of the start and end boxes relative to the board
        const x1 = startBox.left + startBox.width / 2 - board.left;
        const y1 = startBox.top + startBox.height / 2 - board.top;
        const x2 = endBox.left + endBox.width / 2 - board.left;
        const y2 = endBox.top + endBox.height / 2 - board.top;
    
        // Calculate the line's width and rotation angle
        const width = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI); // Convert to degrees
    
        // Set the line's styles
        line.style.width = `${width}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
    
        // Set the line's color based on the winner
        line.style.backgroundColor = winner === "x" ? "#ffa500" : "#00FFFF"; // Example colors
    
        // Set the title for the winner
        if (winner === "x") {
            titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon}> Wins`;
        } else {
            titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon}> Wins`;
        }
    };
    

    const reset = () => {
        setLock(false);
        data = ["", "", "", "", "", "", "", "", ""];
        titleRef.current.innerHTML = 'Tic Tac Toe in <span>React</span>';
        box_array.map((e) => {
            e.current.innerHTML = "";
        });
    
        // Reset the winning line
        const line = lineRef.current;
        line.style.width = "0";
        line.style.left = "0";
        line.style.top = "0";
        line.style.transform = "none";
        line.style.backgroundColor = ""; // Reset to default or transparent
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>
                Tic Tac Toe Game In <span>React</span>
            </h1>
            <div className="board">
                <div className="line" ref={lineRef}></div> {/* Winning line */}
                <div className="row1">
                    <div className="boxes" ref={box1} onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" ref={box2} onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" ref={box3} onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" ref={box4} onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" ref={box5} onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" ref={box6} onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row3">
                    <div className="boxes" ref={box7} onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" ref={box8} onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" ref={box9} onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className="reset" onClick={reset}>
                Reset
            </button>
        </div>
    );
};

export default TicTacToe;
