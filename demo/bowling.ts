// tslint:disable: no-console
import * as ReadLine from "readline";

interface Error {
    errcode: number;
    errmsg: string;
}

class Bowling {

    private readline: ReadLine.Interface;

    constructor() {
        this.readline = ReadLine.createInterface({
            input: process.stdin,
            output: process.stdout,
          });
    }

    public getSequence() {
        this.readline.question("please enter sequence:", (sequence) => {
            const error = this.validate(sequence);
            if (error.errcode !== 0) {
                console.log("sequence is not valid, details:");
                console.error(error.errmsg);
                console.log("try again!");

            } else {

            }
            this.getSequence();
        });
    }

    private error(errcode: number, errmsg: string): Error {
        return {
            errcode,
            errmsg,
        };
    }

    private validate(sequence: string): Error {
        if (sequence === undefined || sequence === null || sequence.trim().length === 0) {
            return this.error( 1, "sequence should not be empty");
        }
        const scoreArray = sequence.toUpperCase().split("");
        let totalScore = 0;
        for (let i = 0; i < scoreArray.length; i++) {
            const score = scoreArray[i];
            if (score === 'X') {
                totalScore += 10;
            }
        }
    }
}

const bowling = new Bowling();
bowling.getSequence();
