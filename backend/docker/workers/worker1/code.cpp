template <typename... Args>
auto sum(Args... xs)
{
    return (xs + ...);
}