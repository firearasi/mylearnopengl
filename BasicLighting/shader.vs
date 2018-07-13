#version 460 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;



out vec2 TexCoord;
out vec4 position;
out vec3 fragPos;
out vec3 normal;
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform mat4 translation;
uniform mat3 normalMatrix;
uniform float u_time;

void main()
{


	position= vec4(aPos, 1.0);
	
	// actual position for rendering lighting
	fragPos = vec3(translation * model * position);
	
	// viewport position
	position = projection * view * vec4(fragPos, 1.0f);
	
	
	// Adjust normal vector to the world space
	
	// inverse is a costly operation on GPU
	// normal = mat3(transpose(inverse(model))) * aNormal;
	// instead 
	normal = normalMatrix * aNormal;
	gl_Position = position;
}
