import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

const initialFigurePositions: { [key: string]: { name: FigureEnum, side: Side } } = {
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

type Row = RowItem | null;

type RowItem = {
  figure: Figure | null, field: boolean, available: boolean,
  cellNumber: number, column: Column, row: Roww
}

type Figure = { name: FigureEnum, side: Side }

type Column = { sign: string, index: number }

type Roww = {
  index: number,
  order: number
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CdkDropList, CdkDrag],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'checkmate';
  countOfCells: number = 64;
  columns: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  // board: Row[][] = []
  board: any[][] = []
  draggingElement: any = null;
  dragEl: any = null;

  ngOnInit(): void {
    for (let i = 0; i < this.columns.length; i++) {
      const row = [];
      for (let j = 0; j < this.columns.length; j++) {
        row.push({
          column: {
            sign: this.columns[j],
            index: j
          },
          row: {
            index: i,
            order: this.columns.length - i
          },
          figure: initialFigurePositions[this.columns[j].toLowerCase() + (this.columns.length - i)],
          available: false,
          field: i % 2 ? j % 2 === 1 : j % 2 === 0,
          cellNumber: (i * 8) + (j + 1)
        })
      }
      this.board.push(row);
    }
  }

  dragOver(event: DragEvent): void {
    // console.log('DRAGOVER :', event);

    event.preventDefault();
  }

  dragStart(event: DragEvent, rowItem: RowItem): void {
    this.draggingElement = rowItem;

    switch (rowItem.figure?.name) {
      case FigureEnum.PAWN: {
        this.board[rowItem.row.index - 1][rowItem.column.index].available = true;
        this.board[rowItem.row.index - 2][rowItem.column.index].available = true;
        break;
      }

      case FigureEnum.ROOK: {
        for (let j = 1; rowItem.row.index >= j; j++) {
          this.board[rowItem.row.index - j][rowItem.column.index].available = true;
        }

        for (let j = 1; j < 8; j++) {
          console.log('rowItem.row.index :', rowItem.row.index);
          console.log('rowItem.column.index + j :', rowItem.column.index + j);
          this.board[rowItem.row.index][rowItem.column.index + j].available = true;
        }

        break;
      }

      case FigureEnum.BISHOP: {
        console.log('rowItem :', rowItem);
        const rows = []
        for (let i = 0; rowItem.row.index > i; i++) {
          // console.log('i :', i);
          // rows.push(i)
        }

        const columns = [];
        for (let j = 0; rowItem.column.index > j; j++) {
          // console.log()

          rows.push(rowItem.row.index - (j + 1))
          columns.push(j)

        }
        console.log('rows :', rows);
        console.log('columns :', columns);

        columns.reverse().forEach((column, index) => {
          this.board[rowItem.row.index - (index + 1)][column].available = true;
        });


        break;
      }

      case FigureEnum.KNIGHT: {
        this.board[rowItem.row.index - 2][rowItem.column.index - 1].available = true;
        this.board[rowItem.row.index - 2][rowItem.column.index + 1].available = true;
        this.board[rowItem.row.index - 1][rowItem.column.index + 2].available = true;
        break;
      }

      case FigureEnum.QUEEN: {
        
        break;
      }

      case FigureEnum.KING: {
        console.log('this.board :', this.board);
        this.board[rowItem.row.index - 1][rowItem.column.index].available = true;
        this.board[rowItem.row.index - 1][rowItem.column.index - 1].available = true;
        this.board[rowItem.row.index - 1][rowItem.column.index + 1].available = true;
        this.board[rowItem.row.index][rowItem.column.index - 1].available = true;
        this.board[rowItem.row.index][rowItem.column.index + 1].available = true;
        break;
      }

      default:
        break;
    }

    event.dataTransfer!.setData('id', (event.target as any).id)
    // console.log('(event.target as any).id :', (event.target as any).id);
  }

  dropp(event: DragEvent, rowItem: RowItem, rowIndex: number, index: any): void {
    console.log('rowItem :', rowItem);
    console.log('DROP :', event);
    // rowItem = this.draggingElement;
    console.log('this.draggingElement :', this.draggingElement);

    console.log('this.draggingElement.row :', this.draggingElement.row);
    // console.log('rowItem.row :', rowItem.row);
    const distination = Math.abs(this.draggingElement.row - rowItem.row.index);
    // let distination = this.draggingElement.row - rowItem.row;
    console.log('distination :', distination);

    switch (this.draggingElement.figure?.name) {
      case FigureEnum.PAWN:
        if (distination < 3 && this.draggingElement.figure.side === Side.WHITE ? rowItem.row > this.draggingElement.row : rowItem.row < this.draggingElement.row) {
          if (rowItem.figure?.side !== this.draggingElement.figure?.side) {
            this.board[rowIndex][index].figure = { ...this.draggingElement.figure };

            this.board[8 - this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)].figure = undefined;

            this.draggingElement = null;
          }
        }
        break;

      case FigureEnum.KNIGHT:
        if ([1, 2].includes(distination) && rowItem.field !== this.draggingElement.field) {
          if (rowItem.figure?.side !== this.draggingElement.figure?.side) {
            this.board[rowIndex][index].figure = { ...this.draggingElement.figure };

            this.board[8 - this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)].figure = undefined;

            this.draggingElement = null;
          }
        }
        break;

      case FigureEnum.BISHOP: {
        if (rowItem.field === this.draggingElement.field) {
          if (rowItem.figure?.side !== this.draggingElement.figure?.side) {
            this.board[rowIndex][index].figure = { ...this.draggingElement.figure };

            this.board[8 - this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)].figure = undefined;

            this.draggingElement = null;
          }
        }
        break;
      }

      case FigureEnum.KING: {
        if (distination === 1) {
          if (rowItem.figure?.side !== this.draggingElement.figure?.side) {
            this.board[rowIndex][index].figure = { ...this.draggingElement.figure };

            this.board[8 - this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)].figure = undefined;

            this.draggingElement = null;
          }
        }
        break;
      }

      case FigureEnum.QUEEN: {
        if ((rowItem.column === this.draggingElement.column) || (rowItem.row === this.draggingElement.row) || rowItem.field === this.draggingElement.field) {
          this.board[rowIndex][index].figure = { ...this.draggingElement.figure };

          this.board[8 - this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)].figure = undefined;

          this.draggingElement = null;
        }
        break;
      }

      case FigureEnum.ROOK: {
        if ((rowItem.column === this.draggingElement.column) || (rowItem.row === this.draggingElement.row)) {
          this.board[rowIndex][index].figure = { ...this.draggingElement.figure };

          this.board[8 - this.draggingElement.row][this.columns.indexOf(this.draggingElement.column)].figure = undefined;

          this.draggingElement = null;
        }
        break;
      }

      default:
        break;
    }


    let itemId = event.dataTransfer!.getData('id')
    console.log('event.dataTransfer :', event.dataTransfer);
    console.log('itemId :', itemId);

    this.board.forEach(row => {
      row.forEach(rowItem => {
        rowItem.available = false;
      });
    });


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

  // drop(event: CdkDragDrop<number[]>) {
  drop(event: CdkDragDrop<number[]>) {
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
