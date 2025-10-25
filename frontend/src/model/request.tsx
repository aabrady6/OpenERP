import {type Point} from '../model/point'

export interface Request {
  point: Point;
  radius: number;
}