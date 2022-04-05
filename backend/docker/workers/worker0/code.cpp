#include <string>
 
bool startsWith(std::string str, char ch)
{
    return str.starts_with(ch);
}

bool endsWith(std::string str, char ch)
{
    return str.ends_with(ch);
}