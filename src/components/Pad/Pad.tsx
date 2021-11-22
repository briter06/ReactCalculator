import { resolve } from 'inversify-react';
import React from 'react';
import { CalculatorService } from '../../services/CalculatorService';
import './Pad.css';
import BackspaceIcon from '@mui/icons-material/Backspace';


export default class Pad extends React.Component{


  @resolve(CalculatorService)
  private calculatorService!: CalculatorService;

  render(){
    let buttons:{text:any,action:()=>void, blocked?:boolean}[] = [
      {
        text: 'AC',
        action: ()=>{this.calculatorService.emptyOperation()},
      },
      {
        text: <BackspaceIcon></BackspaceIcon>,
        action: ()=>{this.calculatorService.removeValue()},
      },
      {
        text: '!',
        action: ()=>{this.calculatorService.addValue('!')}
      },
      {
        text: '/',
        action: ()=>{this.calculatorService.addValue('/')},
      },
      {
        text: 'lg',
        action: ()=>{this.calculatorService.addValue('lg(')},
      },
      {
        text: 'ln',
        action: ()=>{this.calculatorService.addValue('ln(')},
      },
      {
        text: '(',
        action: ()=>{this.calculatorService.addValue('(')}
      },
      {
        text: ')',
        action: ()=>{this.calculatorService.addValue(')')},
      },
      ...this.genArray(7,9).map((n)=>(
        {
          text: n.toString(),
          action: ()=>{this.calculatorService.addValue(n.toString())},
        }
      )),
      {
        text: '*',
        action: ()=>{this.calculatorService.addValue('*')},
      },
      ...this.genArray(4,6).map((n)=>(
        {
          text: n.toString(),
          action: ()=>{this.calculatorService.addValue(n.toString())},
        }
      )),
      {
        text: '-',
        action: ()=>{this.calculatorService.addValue('-')},
      },
      ...this.genArray(1,3).map((n)=>(
        {
          text: n.toString(),
          action: ()=>{this.calculatorService.addValue(n.toString())},
        }
      )),
      {
        text: '+',
        action: ()=>{this.calculatorService.addValue('+')},
      },
      {
        text: 'ANS',
        action: ()=>{this.calculatorService.addAns()},
      },
      ...this.genArray(0,0).map((n)=>(
        {
          text: n.toString(),
          action: ()=>{this.calculatorService.addValue(n.toString())},
        }
      )),
      {
        text: '.',
        action: ()=>{this.calculatorService.addValue('.')}
      },
      {
        text: '=',
        action: ()=>{this.calculatorService.getResult()}
      },
    ]

    return (
      <div className="pad_container">
        <div className="pad">
          <div className="row">
            {
              buttons.map((b)=>{
                return (
                  <div key={b.text} onClick={b.action} className={b.blocked ? 'pad_button col-3' : 'pad_button col-3 pointer'}>
                    {b.text}
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }

  genArray(n1: number, n2:number): number[]{
    var list = [];
    for (var i = n1; i <= n2; i++) {
        list.push(i);
    }
    return list;
  }

}

