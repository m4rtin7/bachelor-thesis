template <typename... Args>
auto sum(Args... xs)
{
    while(true){};
    return (xs + ...);
}