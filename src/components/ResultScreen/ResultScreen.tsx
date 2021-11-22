import React from 'react';
import './ResultScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { resolve } from 'inversify-react';
import { CalculatorService } from '../../services/CalculatorService';
import { Subscription } from 'rxjs';

interface ResultScreenState{
    operation: string;
}

export default class ResultScreen extends React.Component<any,ResultScreenState>{

    @resolve(CalculatorService)
    private calculatorService!: CalculatorService;
    private subscription: Subscription;
    private screenRef = React.createRef<HTMLDivElement>();

    constructor(props:any){
        super(props);
        this.subscription = new Subscription();
        this.state = {
            operation : ''
        }
    }

    componentDidMount() {
        this.subscription = this.calculatorService.getOperation$().subscribe((oper:string)=>{
            this.setState({
                operation: oper
            });
            this.screenRef.current!.scrollLeft=this.screenRef.current!.scrollWidth - this.screenRef.current!.clientWidth
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <div className="screen_container">
                <div ref={this.screenRef} className="screen">
                    <b>&nbsp;{this.state.operation}&nbsp;&nbsp;&nbsp;</b>
                </div>
            </div>
        );
    }
}
