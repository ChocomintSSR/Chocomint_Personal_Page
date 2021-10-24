#include <iostream>
#include "Matrix.h"
using namespace std;

int main()
{
	matrix<double> matA;
	matA = {{2, 6, 3},
		{1, 0, 2},
		{5, 8, 4}};

	cout << matA.det() << "\n"; // 28

	cout << matA.Trans() << "\n";
	// 2 1 5
	// 6 0 8
	// 3 2 4

	cout << matA.M(0, 0) << "\n";	// -16

	cout << matA.A(0, 0) << "\n\n"; // -16

	cout << matA.adj() << "\n";
	// -16 -0 12
	// 6 -7 -1
	// 8 14 -6

	cout << matA.inverse() << "\n";
	// -0.571429 -0 0.428571
	// 0.214286 -0.25 -0.0357143
	// 0.285714 0.5 -0.214286

	return 0;
}