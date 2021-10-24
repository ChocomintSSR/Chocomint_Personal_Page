#include <iostream>
#include "stringEX.h"
using namespace std;

int main()
{
	stringEX s = "123#add456#add789";

	s.replaceAll("#add", "+");
	cout << s; // 123+456+789

	return 0;
}