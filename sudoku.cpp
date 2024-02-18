#include <iostream>
#include <cmath>
using namespace std;

void Print(int board[][9]){
    for(int i=0;i<9;i++){
        for(int j=0;j<9;j++){
            cout<<board[i][j]<<" ";
        }
        cout<<endl;
    }
}

bool isValid(int board[][9],int i,int j,int num){
    for(int k=0;k<9;k++){
        if(board[i][k]==num || board[k][j]==num){
            return false;
        }
    }

    int rn=sqrt(9);
    int row=i-(i%rn);
    int col=j-(j%rn);

    for(int x=row;x<row+rn;x++){
        for(int y=col;y<col+rn;y++){
            if(board[x][y]==num){
                return false;
            }
        }
    }
    return true;
}
bool sudokuSolver(int board[][9],int i,int j,int n){
    if(i==n){
        Print(board);
        return true;
    }
    if(j==n){
        return sudokuSolver(board,i+1,j,n);
    }

    if(board[i][j]!=0){
        return sudokuSolver(board,i,j+1,n);
    }

    for(int num=1;num<=n;num++){
        if(isValid(board,i,j,num)){
            board[i][j]=num;
            bool t=sudokuSolver(board,i,j+1,n);
            if(t){
                return true;
            }
            board[i][j]=0;
        }
    }
    // return false;
}
int main()
{
    int board[9][9] = { { 8, 0, 0, 9, 1, 7, 0, 2, 0 }, { 2, 0, 3, 0, 6, 0, 5, 9, 0 }, { 9, 4, 7, 2, 3, 5, 8, 1, 6 }, { 1, 8, 5, 3, 9, 6, 7, 2, 4 }, { 7, 6, 2, 1, 4, 8, 3, 5, 9 }, { 3, 9, 4, 5, 7, 2, 6, 8, 1 }, { 5, 2, 1, 6, 8, 3, 9, 7, 4 }, { 4, 3, 9, 7, 5, 1, 2, 6, 8 }, { 6, 7, 8, 4, 2, 9, 1, 3, 5 } };
    sudokuSolver(board,0,0,9);
    return 0;
}