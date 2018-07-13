CPPFLAGS=-I/usr/include/ -I..
LDLIBS= -lGLEW -lGL `pkg-config --static --libs glfw3` 
CC=g++
TARGET = main
all: $(TARGET) 

$(TARGET): $(TARGET).o ../glad/glad.o
glad.o: ../glad/glad.c

test: all
	./main
clean:
	rm *.o $(TARGET)
.PHONY: all clean test
