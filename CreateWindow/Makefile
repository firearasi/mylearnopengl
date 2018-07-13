CPPFLAGS=-I/usr/include/
LDLIBS= -lGLEW -lGL `pkg-config --static --libs glfw3` 
CC=g++
TARGET = CreateWindow
all: $(TARGET)

$(TARGET): $(TARGET).o glad.o
glad.o: glad.c

clean:
	rm *.o
.PHONY: all clean
