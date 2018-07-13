#version 460 core
uniform vec4 objectColor;
uniform vec4 lightColor;
uniform vec3 lightPos;
uniform vec3 viewPos;

in vec4 position;
in vec3 normal;
in vec3 fragPos;


out vec4 color;

//uniform sampler2D texture0;
//uniform sampler2D texture1;

uniform float u_time;

struct Material {
	vec4 ambient;
	vec4 diffuse;
	vec4 specular;
	float shininess;
};

uniform Material material;

void main()
{	
	vec4 st = position;
	// Ambient lighting
	float ambientStrength = 1.0;
	vec4 ambient = material.ambient * ambientStrength;
	
	// Diffuse lighting
	
	vec3 normalVec = normalize(normal);
	vec3 lightDir = normalize(lightPos - fragPos);
	vec4 diffuse = max(dot(normalVec, lightDir), 0) * lightColor;
	
	// Specular lighting
	float specularStrength = 1.0;
	
	vec3 viewDir = normalize(viewPos - fragPos);
	vec3 reflectedDir = reflect(-lightDir, normalVec);
	vec4 specular = pow(max(dot(viewDir, reflectedDir), 0), material.shininess) * lightColor * specularStrength;
	
	vec4 result = ambient * material.ambient + diffuse * material.diffuse + specular * material.specular;
	color = result;
}	
