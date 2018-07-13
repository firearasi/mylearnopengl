#version 460 core
layout (location = 0) in vec3 aPos;
out vec4 vertexColor;
uniform float horizontalOffset;
void main()
{
	vec4 position = vec4(aPos, 1.0);
	
	// uncheck to put the triangle upside down
	//position.y = -position.y;
	
	position.x += horizontalOffset;
	
	gl_Position = position;
	vertexColor = vec4(0.5, 0.3, 0.4, 1.0);
}
