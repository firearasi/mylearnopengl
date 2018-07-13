CPPFLAGS=-I/usr/include/ -I..
LDLIBS= -lGLEW -lGL `pkg-config --static --libs glfw3` 
CC=g++
TARGET = main
all: $(TARGET) 

$(TARGET): $(TARGET).o glad.o
glad.o: glad.c

clean:
	rm *.o $(TARGET)
.PHONY: all clean
