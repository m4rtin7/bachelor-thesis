#include <string>
 
bool startsWith(std::string str, char ch)
{
    return ch == str[0];
    
}

bool endsWith(std::string str, char ch)
{
    return ch == str[str.length()-1];
       
}