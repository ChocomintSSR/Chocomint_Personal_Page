#include <iostream>
#include <vector>
#include "stringEX.h"
using namespace std;

int main()
{
	vector<stringEX> v;
	stringEX s = "ABCDEFG";

	v = s.splitByLength(3);
	// v = {ABC, DEF, G}

	for (auto i : v)
		cout << i << " ";
	// ABC DEF G
	
	return 0;
}