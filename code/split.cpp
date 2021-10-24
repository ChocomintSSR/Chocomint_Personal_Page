#include <iostream>
#include <vector>
#include "stringEX.h"
using namespace std;

int main()
{
	vector<stringEX> v;
	stringEX s = "abc+def+ghi";

	v = s.split("+");
	// v = {abc, def, ghi}

	for (auto i : v)
		cout << i << " ";
	// abc def ghi 
	
	return 0;
}