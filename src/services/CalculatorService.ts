import "reflect-metadata";
import { injectable } from "inversify";
import { Subject } from "rxjs";
import { evaluate, log, e } from 'mathjs'



@injectable()
export class CalculatorService{

    private operation$: Subject<string>;

    private functions = {
        functions: {
            'ln': (n:number)=>log(n,e),
            'lg': (n:number)=>log(n,10),
        }
    }

    private replacements = [
        {
            text : 'ln(',
            replace : ()=>'functions.ln('
        },
        {
            text : 'lg(',
            replace : ()=>'functions.lg('
        },
        {
            text : 'ANS',
            replace : ()=>this.getAnswer()
        }
    ]

    private operation: string[];
    private answer: string;

    constructor(){
        this.operation$ = new Subject<string>();
        this.operation = []
        this.answer = '';
    }

    getAnswer(){
        return this.answer;
    }

    sendOperation(){
        this.operation$.next(this.operation.join(''));
    }

    addAns(){
        if(this.answer.trim()!==''){
            this.operation.push('ANS');
            this.sendOperation();
        }
    }

    getOperation$(){
        return this.operation$.asObservable();
    }

    addValue(n:string){
        this.operation.push(n);
        this.sendOperation();
    }

    emptyOperation(){
        this.operation = [];
        this.sendOperation();
    }

    removeValue(){
        this.operation.pop();
        this.sendOperation();
    }

    getResult(){
        try{
            let oper: string[] = this.operation;
            for(let i in this.replacements){
                let rep = this.replacements[i];
                oper = oper.map((o)=>{
                    return o === rep.text ? rep.replace() : o
                });
            }
            let res:number =  evaluate(oper.join(''), this.functions);
            this.operation = [res.toString()];
            this.answer = res.toString();
            this.sendOperation();
        }catch(err){
            if(err instanceof SyntaxError){
                this.operation = [];
                this.operation$.next('Syntax error');
            }else{
                this.operation$.next((err as Error).message);
            }
        }
    }
}