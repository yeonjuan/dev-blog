function solution(skill, skill_trees) {
  return skill_trees
      .map(skillTree => (
          [...skillTree].filter(s => skill.includes(s)).join('')
      )).filter(skillTree => (
          skill.slice(0, skillTree.length) === skillTree
      )).length;
}
