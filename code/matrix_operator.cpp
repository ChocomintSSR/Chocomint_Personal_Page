#include <iostream>
#include "Matrix.h"
using namespace std;

int main()
{
	matrix<double> matA(3, 1), matB(3, 2), matC;
	cout << matA[2][2] << "\n"; // 直接取值
	matC = matA;				// 賦值
	matC = matA * matB;			// 乘
	matC += matA;				// 加法賦值
	cout << matC << "\n";		// 直接輸出陣列

	return 0;
}