import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FigureEnum } from './figure.enum';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

enum Side {
  WHITE = 'white',
  BLACK = 'black',
}

const initialFigurePositions: { [key: string]: any } = {
  a8: {
    name: FigureEnum.ROOK,
    side: Side.BLACK,
  },
  a7: {
    name: FigureEnum.PAWN,
    side: Side.BLACK,
  },
  a2: {
    name: FigureEnum.PAWN,
    side: Side.WHITE,
  },
  a1: {
    name: FigureEnum.ROOK,
    side: Side.WHITE,
  },
  b8: {
    name: FigureEnum.KNIGHT,
    side: Side.BLACK,
  },
  b7: {
    name: FigureEnum.PAWN,
    side: Side.BLACK,
  },
  b2: {
    name: FigureEnum.PAWN,
    side: Side.WHITE,
  },
  b1: {
    name: FigureEnum.KNIGHT,
    side: Side.WHITE,
  },
  c8: {
    name: FigureEnum.BISHOP,
    side: Side.BLACK,
  },
  c7: {
    name: FigureEnum.PAWN,
    side: Side.BLACK,
  },
  c2: {
    name: FigureEnum.PAWN,
    side: Side.WHITE,
  },
  c1: {
    name: FigureEnum.BISHOP,
    side: Side.WHITE,
  },
  d8: {
    name: FigureEnum.QUEEN,
    side: Side.BLACK,
  },
  d7: {
    name: FigureEnum.PAWN,
    side: Side.BLACK,
  },
  d2: {
    name: FigureEnum.PAWN,
    side: Side.WHITE,
  },
  d1: {
    name: FigureEnum.QUEEN,
    side: Side.WHITE,
  },
  e8: {
    name: FigureEnum.KING,
    side: Side.BLACK,
  },
  e7: {
    name: FigureEnum.PAWN,
    side: Side.BLACK,
  },
  e2: {
    name: FigureEnum.PAWN,
    side: Side.WHITE,
  },
  e1: {
    name: FigureEnum.KING,
    side: Side.WHITE,
  },
  f8: {
    name: FigureEnum.BISHOP,
    side: Side.BLACK,
  },
  f7: {
    name: FigureEnum.PAWN,
    side: Side.BLACK,
  },
  f2: {
    name: FigureEnum.PAWN,
    side: Side.WHITE,
  },
  f1: {
    name: FigureEnum.BISHOP,
    side: Side.WHITE,
  },
  g8: {
    name: FigureEnum.KNIGHT,
    side: Side.BLACK,
  },
  g7: {
    name: FigureEnum.PAWN,
    side: Side.BLACK,
  },
  g2: {
    name: FigureEnum.PAWN,
    side: Side.WHITE,
  },
  g1: {
    name: FigureEnum.KNIGHT,
    side: Side.WHITE,
  },
  h8: {
    name: FigureEnum.ROOK,
    side: Side.BLACK,
  },
  h7: {
    name: FigureEnum.PAWN,
    side: Side.BLACK,
  },
  h2: {
    name: FigureEnum.PAWN,
    side: Side.WHITE,
  },
  h1: {
    name: FigureEnum.ROOK,
    side: Side.WHITE,
  }
};

// interface Row

type Row = { figure: { name: FigureEnum, side: Side } | null } | null;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CdkDropList, CdkDrag],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'checkmate';
  countOfCells: number = 64;
  columns: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  // board: Row[][] = []
  board: any[][] = []
  draggingElement: any = null;

  constructor() {
    for (let i = 0; i < this.columns.length; i++) {
      const row = [];
      for (let j = 0; j < this.columns.length; j++) {
        row.push({
          column: this.columns[j],
          row: this.columns.length - i,
          figure: initialFigurePositions[this.columns[j].toLowerCase() + (this.columns.length - i)],
          available: false,
          field: i % 2 ? j % 2 === 1 : j % 2 === 0
        })
      }
      this.board.push(row);
    }
    console.log('this.board :', this.board);
    /* setTimeout(() => {
      this.board[0][0].figure = null;
    }, 2000); */
  }

  dragOver(event: DragEvent): void {
    // console.log('DRAGOVER :', event);

    event.preventDefault();
  }

  dragStart(event: DragEvent, rowItem: any): void {
    // console.log('DRAG  :', event);
    this.draggingElement = rowItem;
    event.dataTransfer!.setData('id', (event.target as any).id)
    // console.log('(event.target as any).id :', (event.target as any).id);
  }

  dropp(event: DragEvent, rowItem: any, rowIndex: number, index: any): void {
    console.log('rowItem :', rowItem);
    console.log('DROP :', event);
    // rowItem = this.draggingElement;
    console.log('this.draggingElement :', this.draggingElement);
    const distination = Math.abs(this.draggingElement.row - rowItem.row);
    console.log('distination :', distination);

    switch (this.draggingElement.figure?.name) {
      case FigureEnum.PAWN:

        if (distination < 3) {
          if (rowItem.figure?.side !== this.draggingElement.figure?.side) {
            this.board[rowIndex][index].figure = { ...this.draggingElement.figure };
            console.log('this.board[this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)] :', this.board[this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)]);
            console.log('this.columns.indexOf(this.draggingElement.column) :', this.columns.indexOf(this.draggingElement.column));

            this.board[8 - this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)].figure = undefined;
            console.log('this.board :', this.board);

            this.draggingElement = null;
          }
        }
        break;

      case FigureEnum.KNIGHT:
        if ([1,2].includes(distination) && rowItem.field !== this.draggingElement.field) {
          if (rowItem.figure?.side !== this.draggingElement.figure?.side) {
            this.board[rowIndex][index].figure = { ...this.draggingElement.figure };
            console.log('this.board[this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)] :', this.board[this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)]);
            console.log('this.columns.indexOf(this.draggingElement.column) :', this.columns.indexOf(this.draggingElement.column));

            this.board[8 - this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)].figure = undefined;
            console.log('this.board :', this.board);

            this.draggingElement = null;
          }
        }
        break;

      case FigureEnum.BISHOP: {
        if (rowItem.field === this.draggingElement.field) {
          if (rowItem.figure?.side !== this.draggingElement.figure?.side) {
            this.board[rowIndex][index].figure = { ...this.draggingElement.figure };
            console.log('this.board[this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)] :', this.board[this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)]);
            console.log('this.columns.indexOf(this.draggingElement.column) :', this.columns.indexOf(this.draggingElement.column));

            this.board[8 - this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)].figure = undefined;
            console.log('this.board :', this.board);

            this.draggingElement = null;
          }
        }
        break;
      }

      default:
        break;
    }


    let itemId = event.dataTransfer!.getData('id')
    console.log('event.dataTransfer :', event.dataTransfer);
    console.log('itemId :', itemId);

    // if ((event.target as any).tagName === 'IMG') {
    //   console.log('(event.target as any).parentElement.children :', (event.target as any).parentElement.children);
    //   (event.target as any).parentElement.childNodes
    //   console.log('(event.target as any).parentElement.childNodes :', (event.target as any).parentElement.childNodes);
    //   Array.from((event.target as any).parentElement.children).forEach((element: any) => {
    //   console.log('element :', element);
    //     // element.remove();
    //     element.style.display = 'none';
    //   });

    //   console.log('(event.target as any).parentElement :', (event.target as any).parentElement);
    //   (event.target as any).parentElement.append(document.getElementById(itemId));

    // } else {
    //   (event.target as any).append(document.getElementById(itemId))
    // }
  }

  all = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  even = [10];





  // drop(event: CdkDragDrop<number[]>) {
  drop(event: CdkDragDrop<any[]>) {
    console.log('event :', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return true;
    return false;
  }
}
