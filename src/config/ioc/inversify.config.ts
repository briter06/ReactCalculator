import "reflect-metadata";
import { Container } from 'inversify';
import { CalculatorService } from '../../services/CalculatorService';

const container = new Container();
container.bind(CalculatorService).toSelf().inSingletonScope();

export {container};
