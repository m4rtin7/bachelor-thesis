std::tuple<bool, bool, bool, bool> foo(
    float a,
    float b
)
{
    auto result = a <=> b;

    return std::make_tuple(
        std::is_gt(result),
        std::is_lt(result),
        std::is_eq(result),
        result == std::partial_ordering::unordered);
}