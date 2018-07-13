#version 460 core
//in vec3 ourColor;
//in vec2 TexCoord;
in vec4 position;
out vec4 color;

uniform vec4 lightColor;

uniform float u_time;
void main()
{
	float theta = u_time / 2.0;
	
	
	vec4 st = position;
	
	color = lightColor;
}	
