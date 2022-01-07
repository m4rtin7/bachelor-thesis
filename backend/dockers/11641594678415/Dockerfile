FROM rikorose/gcc-cmake

COPY . .

CMD cmake . && make && timeout 30 ./solution