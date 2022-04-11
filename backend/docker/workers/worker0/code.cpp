#include <string>
 
bool startsWith(std::string str, char ch)
{
    // if(str.length() == 0) return false;
    // return str[0] == ch;

    return str.length() == 0 ? false : str[0] == ch;

    return false;
}

bool endsWith(std::string str, char ch)
{
    // if(str.length() == 0) return false;
    // return str[str.length()-1] == ch;

    return str.length() == 0 ? false : str[str.length()-1] == ch;

    return false;
}