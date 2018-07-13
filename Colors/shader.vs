#version 460 core
layout (location = 0) in vec3 aPos;
//layout (location = 1) in vec3 aColor;
//layout (location = 1) in vec2 aTexCoord;


//out vec3 ourColor;
out vec2 TexCoord;
out vec4 position;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform mat4 translation;
uniform float u_time;

void main()
{


	position= vec4(aPos, 1.0);
	
	
	position = projection * view * translation * model * position;
//	ourColor = aColor;
//	TexCoord = aTexCoord;
	gl_Position = position;
}
